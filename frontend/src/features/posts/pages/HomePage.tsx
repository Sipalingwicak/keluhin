import Navbar from "../../../shared/components/Navbar";

const Component = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text 2xl font-bold text-center mb-6">
          Keluhin aja di sini
        </h1>
        <p className="text-center text-base-content/60">
          Keluhin semuanya di sini secara anonym tanpa perlu ragu ada yang
          nyinyirin.
        </p>
      </main>
    </div>
  );
};

export { Component };
