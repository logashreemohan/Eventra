class User {
  constructor(id, name, email, password, role, phone, location, created_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; // 'client', 'vendor', 'admin'
    this.phone = phone;
    this.location = location;
    this.created_at = created_at;
  }

  // Convert to plain object (for JSON serialization)
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      location: this.location,
      created_at: this.created_at
    };
  }

  // Create user from database row
  static fromRow(row) {
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      row.role,
      row.phone,
      row.location,
      row.created_at
    );
  }
}

export default User;