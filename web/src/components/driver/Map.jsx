import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistributerLocationMap from './DistributerLocationMap';
import Sidebar from '../driver/sidebar/Sidebar';
import Footer from '../driver/footer/Footer';

axios.defaults.baseURL = "http://127.0.0.1:8000";

const Map = () => {
  const [Distributes, setDistributes] = useState([]);

  useEffect(() => {
    const fetchDistributes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/distribute/');
        setDistributes(response.data);
      } catch (error) {
        console.error('Error fetching Distributes:', error);
      }
    };
    fetchDistributes();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className='main'>
        <div className='card'>
          <div className="card-body p-0" style={{ minHeight: "38rem" }}>
            <div>
              <DistributerLocationMap Distributes={Distributes} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Map;
