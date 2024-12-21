export interface UserInterface {
  _id: string;
  email: string;
  name: string;
  progileImage?: string;
}

export interface MessageInterface {
  senderId: string;
  receiverId: string;
  content?: string;
  image?: string;
}
