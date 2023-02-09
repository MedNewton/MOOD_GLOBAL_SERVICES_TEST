import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import axios from 'axios';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  
  const refreshDelay = 300000;
  const [GEXData, setGEXData] = useState();
  const [currentGEXData, setCurrentGEXData] = useState({ currentPrice: 0, currentMktCap: 0, volume24Hrs: 0, open24Hrs: 0, low24Hrs: 0, high24Hrs: 0, changePCT24Hrs: 0 });

  async function getCurrentGEXData(){
    const options = {
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD',
      headers: {
        'authorization': 'Apikey 5144d8cdffd91d36d321f9cd28f5679f7372cb1615b4d8ac8a7b7dbf0525f322',
      }
    };

    await axios.request(options).then(function (response) {
      console.log(response.data.RAW.ETH.USD);
      let responseRawData = response.data.RAW.ETH.USD;
      setCurrentGEXData({ currentPrice: responseRawData.PRICE, currentMktCap: responseRawData.MKTCAP, volume24Hrs: responseRawData.VOLUME24HOUR, open24Hrs: responseRawData.OPEN24HOUR, low24Hrs: responseRawData.LOW24HOUR, high24Hrs: responseRawData.HIGH24HOUR, changePCT24Hrs: responseRawData.CHANGEPCT24HOUR })
      
    }).catch(function (error) {
      console.error(error);
    });
  }


  async function getGEXData(){
    const options = {
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=100',
      headers: {
        'authorization': 'Apikey 5144d8cdffd91d36d321f9cd28f5679f7372cb1615b4d8ac8a7b7dbf0525f322',
      }
    };
    

    await axios.request(options).then(function (response) {
      //console.log(response.data);
      setGEXData(response.data.Data.Data);

    }).catch(function (error) {
      console.error(error);
    });
  }



  useEffect(() => {
    getCurrentGEXData();
    getGEXData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentGEXData();
      getGEXData();
    }, refreshDelay);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className='generalData'>
            <div className='generalDataColumn'><h5 className='currSymbols'>ETH/USD</h5></div>
            <div className='generalDataColumn'>
              <div ></div>
            </div> 
            
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;