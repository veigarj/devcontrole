export interface TicketProps {
    id: string;
    name: string;
    status: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    custumerId: string | null;
    userId: string | null; 
}