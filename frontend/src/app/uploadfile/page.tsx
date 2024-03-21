import type { NextPage } from 'next';
import ImageUploadForm from '@/components/UploadImage';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <ImageUploadForm />
    </div>
  );
};

export default Home;