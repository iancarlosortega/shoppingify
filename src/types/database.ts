export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			categories: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'categories_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			products: {
				Row: {
					category_id: string;
					created_at: string;
					id: string;
					image: string | null;
					name: string;
					note: string | null;
					user_id: string;
				};
				Insert: {
					category_id: string;
					created_at?: string;
					id?: string;
					image?: string | null;
					name: string;
					note?: string | null;
					user_id: string;
				};
				Update: {
					category_id?: string;
					created_at?: string;
					id?: string;
					image?: string | null;
					name?: string;
					note?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'products_category_id_fkey';
						columns: ['category_id'];
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'products_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			shopping_lists: {
				Row: {
					created_at: string;
					id: string;
					items: Json;
					name: string;
					state: string;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					items: Json;
					name: string;
					state: string;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					items?: Json;
					name?: string;
					state?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'shopping_lists_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			users: {
				Row: {
					created_at: string;
					full_name: string;
					id: string;
				};
				Insert: {
					created_at?: string;
					full_name: string;
					id: string;
				};
				Update: {
					created_at?: string;
					full_name?: string;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
