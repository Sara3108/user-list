import { User } from './User';
import { AD } from './Ad';

export interface UserList {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    ad: AD;
}
