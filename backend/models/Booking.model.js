class Booking {
  constructor(id, customer_id, vendor_id, event_date, event_type, guest_count, location, status, total_amount, created_at) {
    this.id = id;
    this.customer_id = customer_id;
    this.vendor_id = vendor_id;
    this.event_date = event_date;
    this.event_type = event_type;
    this.guest_count = guest_count;
    this.location = location;
    this.status = status; // 'pending', 'confirmed', 'completed', 'cancelled'
    this.total_amount = total_amount;
    this.created_at = created_at;
  }

  // Convert to plain object (for JSON serialization)
  toJSON() {
    return {
      id: this.id,
      customer_id: this.customer_id,
      vendor_id: this.vendor_id,
      event_date: this.event_date,
      event_type: this.event_type,
      guest_count: this.guest_count,
      location: this.location,
      status: this.status,
      total_amount: this.total_amount,
      created_at: this.created_at
    };
  }

  // Create booking from database row
  static fromRow(row) {
    return new Booking(
      row.id,
      row.customer_id,
      row.vendor_id,
      row.event_date,
      row.event_type,
      row.guest_count,
      row.location,
      row.status,
      row.total_amount,
      row.created_at
    );
  }
}

export default Booking;