'use client';

import { cilBookmark } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import axiosIntance from '../axios';
import Swal from "sweetalert2";

export default function Wishlist({product_id, isWishlisted}) {
  
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const addToWishlist = async (status) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      Swal.fire({
        title: 'Please login to add items to wishlist',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (product_id == '') {
      Swal.fire({
        title: 'Product ID Is Required',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    setWishlisted(status);
    const params = {
      product_id: product_id,
      user_id: userId,
      status: status
    };
    try {
      const response = await axiosIntance.post(`/front/add_to_wishlist`, params);
      if (response.status === 200) {
        // setIsWishlisted(!isWishlisted);
      } else {
        
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      // alert('An error occurred while adding to wishlist');
    }
  };

  return (
    wishlisted === 'Active' ?
      <i className='fa-solid fa-bookmark text-red-500' onClick={() => addToWishlist("Inactive")}></i> :
      <i className='fa-regular fa-bookmark' onClick={() => addToWishlist("Active")}></i>
  
  );
}
