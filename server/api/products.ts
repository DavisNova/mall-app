import { Router, Request, Response } from 'express';
import pool from '../db/config';

const router = Router();

interface QueryParams {
  page?: string;
  limit?: string;
  category?: string;
  keyword?: string;
  sort?: 'price_asc' | 'price_desc' | 'sales_desc';
}

// 获取商品列表
router.get('/', async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  try {
    const { page = 1, limit = 10, category, keyword, sort } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let sql = 'SELECT * FROM products WHERE status = 1';
    const params: any[] = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (keyword) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    if (sort) {
      switch(sort) {
        case 'price_asc':
          sql += ' ORDER BY price ASC';
          break;
        case 'price_desc':
          sql += ' ORDER BY price DESC';
          break;
        case 'sales_desc':
          sql += ' ORDER BY sales DESC';
          break;
      }
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), offset);

    const [rows] = await pool.execute(sql, params);
    const [total] = await pool.execute('SELECT COUNT(*) as total FROM products WHERE status = 1');

    res.json({
      code: 0,
      msg: 'success',
      data: {
        total: (total as any)[0].total,
        items: rows
      }
    });
  } catch (error) {
    console.error('获取商品列表失败:', error);
    res.status(500).json({
      code: 500,
      msg: '服务器错误'
    });
  }
});

// 获取商品详情
router.get('/:id', async (req: Request<{id: string}>, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ? AND status = 1', [id]);
    
    if (!rows || (rows as any[]).length === 0) {
      return res.status(404).json({
        code: 404,
        msg: '商品不存在'
      });
    }

    res.json({
      code: 0,
      msg: 'success',
      data: rows[0]
    });
  } catch (error) {
    console.error('获取商品详情失败:', error);
    res.status(500).json({
      code: 500,
      msg: '服务器错误'
    });
  }
});

export default router; 