import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface Regulation {
  id: number;
  code: string;
  title: string;
  category: string;
  subcategory?: string;
  effective_date?: string;
  file_path?: string;
  keywords?: string;
  created_at: string;
}

export interface QueryLog {
  id: number;
  query: string;
  response?: string;
  regulations_used?: string;
  response_time?: number;
  created_at: string;
}

class DatabaseManager {
  private db: Database.Database | null = null;

  constructor() {
    try {
      this.initDatabase();
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  private initDatabase() {
    // Vercel 환경에서는 읽기 전용 파일 시스템이므로 메모리 DB 사용
    if (process.env.VERCEL) {
      this.db = new Database(':memory:');
    } else {
      const dbPath = path.join(process.cwd(), 'src/data/kr-code.db');

      // 데이터베이스 디렉토리가 없으면 생성
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      this.db = new Database(dbPath);
    }

    this.createTables();
    this.seedData();
  }

  private createTables() {
    if (!this.db) return;

    // 규정 메타데이터 테이블
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS regulations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code VARCHAR(50) UNIQUE,
        title TEXT NOT NULL,
        category VARCHAR(100),
        subcategory VARCHAR(100),
        effective_date DATE,
        file_path TEXT,
        keywords TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 사용자 질의 로그 테이블
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS query_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        response TEXT,
        regulations_used TEXT,
        response_time INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private seedData() {
    if (!this.db) return;

    const count = this.db.prepare('SELECT COUNT(*) as count FROM regulations').get() as { count: number };

    if (count.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO regulations (code, title, category, subcategory, keywords)
        VALUES (?, ?, ?, ?, ?)
      `);

      const sampleData = [
        ['KR-001-2024-001', '고속철도 곡선반지름 기준', '노반편', '선형기준', '곡선반지름,고속철도,250km/h'],
        ['KR-001-2024-002', '철도터널 최소단면 기준', '토목편', '터널', '터널단면,최소단면,복선터널'],
        ['KR-002-2024-001', '전철전력시설 절연거리', '전기편', '전력설비', '절연거리,전력설비,고압'],
        ['KR-003-2024-001', '신호시설 설치기준', '신호편', '신호설비', '신호기,ATP,폐색'],
        ['KR-004-2024-001', '차량한계 및 건축한계', '차량편', '한계', '차량한계,건축한계,여유공간'],
      ];

      for (const data of sampleData) {
        insert.run(...data);
      }
    }
  }

  public searchRegulations(keyword: string): Regulation[] {
    if (!this.db) return [];

    const stmt = this.db.prepare(`
      SELECT * FROM regulations
      WHERE title LIKE ? OR keywords LIKE ? OR category LIKE ?
      ORDER BY created_at DESC
    `);

    const searchTerm = `%${keyword}%`;
    return stmt.all(searchTerm, searchTerm, searchTerm) as Regulation[];
  }

  public getRegulationByCode(code: string): Regulation | null {
    if (!this.db) return null;

    const stmt = this.db.prepare('SELECT * FROM regulations WHERE code = ?');
    return stmt.get(code) as Regulation || null;
  }

  public getAllRegulations(): Regulation[] {
    if (!this.db) return [];

    const stmt = this.db.prepare('SELECT * FROM regulations ORDER BY category, title');
    return stmt.all() as Regulation[];
  }

  public logQuery(query: string, response?: string, regulationsUsed?: string[], responseTime?: number) {
    if (!this.db) return;

    const stmt = this.db.prepare(`
      INSERT INTO query_logs (query, response, regulations_used, response_time)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(query, response, regulationsUsed?.join(','), responseTime);
  }

  public getQueryLogs(limit = 100): QueryLog[] {
    if (!this.db) return [];

    const stmt = this.db.prepare(`
      SELECT * FROM query_logs
      ORDER BY created_at DESC
      LIMIT ?
    `);

    return stmt.all(limit) as QueryLog[];
  }

  public close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const dbManager = new DatabaseManager();