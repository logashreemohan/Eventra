import db from '../config/db.js';
import Vendor from '../models/Vendor.model.js';

// Create a new vendor profile
const createVendor = async (req, res) => {
  try {
    const { 
      user_id, 
      business_name, 
      category, 
      description, 
      experience, 
      price_range, 
      website, 
      instagram, 
      facebook 
    } = req.body;

    // Check if vendor already exists for this user
    const vendorExists = await db.query(
      'SELECT * FROM vendors WHERE user_id = $1',
      [user_id]
    );

    if (vendorExists.rows.length > 0) {
      return res.status(400).json({ message: 'Vendor profile already exists for this user' });
    }

    // Insert new vendor
    const result = await db.query(
      `INSERT INTO vendors 
      (user_id, business_name, category, description, experience, price_range, website, instagram, facebook, approval_status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [user_id, business_name, category, description, experience, price_range, website, instagram, facebook, 'pending']
    );

    const vendor = Vendor.fromRow(result.rows[0]);

    res.status(201).json({
      message: 'Vendor profile created successfully',
      vendor: vendor.toJSON()
    });
  } catch (error) {
    console.error('Vendor creation error:', error);
    res.status(500).json({ message: 'Server error during vendor creation' });
  }
};

// Get all vendors (with optional filters)
const getVendors = async (req, res) => {
  try {
    const { category, location, minRating, maxPrice } = req.query;
    let query = 'SELECT v.*, u.name as vendor_name, u.location as vendor_location FROM vendors v JOIN users u ON v.user_id = u.id WHERE v.approval_status = $1';
    let params = ['approved'];
    let paramCount = 1;

    // Add filters if provided
    if (category) {
      paramCount++;
      query += ` AND v.category = $${paramCount}`;
      params.push(category);
    }

    if (location) {
      paramCount++;
      query += ` AND u.location = $${paramCount}`;
      params.push(location);
    }

    // Execute query
    const result = await db.query(query, params);

    const vendors = result.rows.map(row => Vendor.fromRow(row));

    res.json({
      vendors: vendors.map(vendor => vendor.toJSON())
    });
  } catch (error) {
    console.error('Get vendors error:', error);
    res.status(500).json({ message: 'Server error fetching vendors' });
  }
};

// Get vendor by ID
const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT v.*, u.name as vendor_name, u.email, u.phone, u.location as vendor_location 
       FROM vendors v 
       JOIN users u ON v.user_id = u.id 
       WHERE v.id = $1 AND v.approval_status = $2`,
      [id, 'approved']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const vendor = Vendor.fromRow(result.rows[0]);

    res.json({
      vendor: vendor.toJSON()
    });
  } catch (error) {
    console.error('Get vendor error:', error);
    res.status(500).json({ message: 'Server error fetching vendor' });
  }
};

// Update vendor profile
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      business_name, 
      category, 
      description, 
      experience, 
      price_range, 
      website, 
      instagram, 
      facebook 
    } = req.body;

    // Check if vendor exists
    const vendorExists = await db.query(
      'SELECT * FROM vendors WHERE id = $1',
      [id]
    );

    if (vendorExists.rows.length === 0) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Update vendor
    const result = await db.query(
      `UPDATE vendors SET 
      business_name = $1, category = $2, description = $3, experience = $4, price_range = $5, 
      website = $6, instagram = $7, facebook = $8 
      WHERE id = $9 RETURNING *`,
      [business_name, category, description, experience, price_range, website, instagram, facebook, id]
    );

    const vendor = Vendor.fromRow(result.rows[0]);

    res.json({
      message: 'Vendor profile updated successfully',
      vendor: vendor.toJSON()
    });
  } catch (error) {
    console.error('Vendor update error:', error);
    res.status(500).json({ message: 'Server error during vendor update' });
  }
};

// Admin: Approve or reject vendor
const approveRejectVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be approved or rejected' });
    }

    // Check if vendor exists
    const vendorExists = await db.query(
      'SELECT * FROM vendors WHERE id = $1',
      [id]
    );

    if (vendorExists.rows.length === 0) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Update vendor status
    const result = await db.query(
      'UPDATE vendors SET approval_status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    const vendor = Vendor.fromRow(result.rows[0]);

    res.json({
      message: `Vendor ${status} successfully`,
      vendor: vendor.toJSON()
    });
  } catch (error) {
    console.error('Vendor approval error:', error);
    res.status(500).json({ message: 'Server error during vendor approval' });
  }
};

export {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  approveRejectVendor
};