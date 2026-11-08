import PageClient from './page.client';

export const metadata = {
  title: 'Blog — Ted Dessert',
  description:
    'Posts by Ted Dessert on UX design, AI and the things he builds: a portfolio chatbot, a portfolio TLDR, and writing a novel with ChatGPT 4.',
};

export default function Page() {
  return <PageClient />;
}
