class Vendor {
  constructor(id, user_id, business_name, category, description, experience, price_range, website, instagram, facebook, approval_status, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.business_name = business_name;
    this.category = category;
    this.description = description;
    this.experience = experience;
    this.price_range = price_range; // '$', '$$', '$$$'
    this.website = website;
    this.instagram = instagram;
    this.facebook = facebook;
    this.approval_status = approval_status; // 'pending', 'approved', 'rejected'
    this.created_at = created_at;
  }

  // Convert to plain object (for JSON serialization)
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      business_name: this.business_name,
      category: this.category,
      description: this.description,
      experience: this.experience,
      price_range: this.price_range,
      website: this.website,
      instagram: this.instagram,
      facebook: this.facebook,
      approval_status: this.approval_status,
      created_at: this.created_at
    };
  }

  // Create vendor from database row
  static fromRow(row) {
    return new Vendor(
      row.id,
      row.user_id,
      row.business_name,
      row.category,
      row.description,
      row.experience,
      row.price_range,
      row.website,
      row.instagram,
      row.facebook,
      row.approval_status,
      row.created_at
    );
  }
}

export default Vendor;