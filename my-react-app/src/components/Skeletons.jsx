// src/components/Skeletons.jsx
import React from 'react';

// ✅ Pour HomePage.jsx
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

// ✅ Pour HomePage.jsx
export const HomePageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

// ✅ Pour CartPage.jsx
export const CartSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4 border-b py-4 animate-pulse">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// ✅ Pour ProductPage.jsx
export const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
        <div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          <div className="h-14 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// ✅ Pour OrdersPage.jsx (optionnel)
export const OrdersSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Pour ProfilePage.jsx (optionnel)
export const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-300 h-32 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};