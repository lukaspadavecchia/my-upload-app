// src/app/page.tsx
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FileUpload />
      <FileList />
    </main>
  );
}
