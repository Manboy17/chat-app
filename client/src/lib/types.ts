export interface UserInterface {
  _id: string;
  email: string;
  name: string;
  progileImage?: string;
}

export interface MessageInterface {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
