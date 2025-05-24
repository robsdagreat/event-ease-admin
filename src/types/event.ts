export interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    venue_id: number;
    type: string;
    status: 'active' | 'cancelled' | 'completed';
    created_at: string;
    updated_at: string;
  }
  
  export interface EventFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    venue_id: number;
    type: string;
    status: 'active' | 'cancelled' | 'completed';
  }