export interface Special {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    venue_id: number;
    type: string;
    status: 'active' | 'expired';
    created_at: string;
    updated_at: string;
  }
  
  export interface SpecialFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    venue_id: number;
    type: string;
    status: 'active' | 'expired';
  }