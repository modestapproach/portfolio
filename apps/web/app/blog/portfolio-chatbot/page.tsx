import PageClient from './page.client';

export const metadata = {
  title: 'Portfolio Chatbot — Ted Dessert',
  description:
    'How I built a chatbot for my portfolio with a vector database, the OpenAI API, Langchain and Streamlit, how the tech works, and what I plan to do with it next.',
};

export default function Page() {
  return <PageClient />;
}
