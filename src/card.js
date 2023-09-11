import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
// import './styles.scss';

const CARDS = {
  visa: '^4',
  amex: '^(34|37)',
  mastercard: '^5[1-5]',
  discover: '^6011',
  unionpay: '^62',
  troy: '^9792',
  diners: '^(30[0-5]|36)',
};

const cardBackgroundName = () => {
  let random = Math.floor(Math.random() * 25 + 1);
  return `${random}.jpeg`;
};

const CHANGE_BACKGROUND_IMG = cardBackgroundName();

const Card = ({
  cardHolder,
  cardNumber,
  cardMonth,
  cardYear,
  cardCvv,
  isCardFlipped,
  currentFocusedElm,
  onCardElementClick,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
}) => {
  const [style, setStyle] = useState(null);

  const cardType = (cardNumber) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return 'visa'; // default type
  };

  const useCardType = useMemo(() => {
    return cardType(cardNumber);
  }, [cardNumber]);

  const outlineElementStyle = (element) => {
    return element
      ? {
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
          transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
        }
      : null;
  };

  useEffect(() => {
    if (currentFocusedElm) {
      const style = outlineElementStyle(currentFocusedElm.current);
      setStyle(style);
    }
  }, [currentFocusedElm]);

  const maskCardNumber = (cardNumber) => {
    let cardNumberArr = cardNumber.split('');
    cardNumberArr.forEach((val, index) => {
      if (index > 4 && index < 14) {
        if (cardNumberArr[index] !== ' ') {
          cardNumberArr[index] = '*';
        }
      }
    });

    return cardNumberArr;
  };

  return (
    <Grid
      item
      sx={{
        backgroundImage: `url(/card-background/${CHANGE_BACKGROUND_IMG})`,
        width: '100%',
        maxWidth: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '270px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        position: 'relative',
        zIndex: '4',
        boxShadow: '0 5px 16px 0 rgba(14, 42, 84, 0.55)',
        userSelect: 'none',
        borderRadius: '15px',
        marginBottom: '50px',
      }}
    >
      <Grid container direction="column" justifyContent="space-between">
        <Grid
          container
          alignItems="center"
          sx={{
            marginBottom: '35px',
          }}
        >
          <Grid item xs={6}>
            {/* need to include changing the width to be 40px on mobile */}
            <img src={'/chip.png'} alt="cc-chip" style={{ width: '60px' }} />
          </Grid>
          <Grid item xs={6}>
            <img
              alt={useCardType}
              src={`/card-type/${useCardType}.png`}
              style={{
                objectFit: 'contain',
                objectPosition: 'top right',
                height: '45px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
                maxWidth: '100px',
                marginLeft: 'auto',
                width: '100%',
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <label
            style={{
              color: '#fff',
              width: '100%',
              maxWidth: 'calc(100% - 85px)',
              fontWeight: 500,
              fontSize: '27px',
              display: 'block',
              cursor: 'pointer',
              fontFamily: "'Source Code Pro', monospace",
              padding: '25px 15px',
              position: 'relative',
              height: '100%',
              textShadow: '7px 6px 10px rgba(14, 42, 90, 0.8)',
              userSelect: 'none',
            }}
            ref={cardNumberRef}
            onClick={() => onCardElementClick('cardNumber')}
          >
            {cardNumber}
          </label>
        </Grid>
        <Grid
          container
          justifyConfident="space-between"
          align-items="center"
          sx={{
            marginBottom: '35px',
          }}
        >
          <Grid item xs={6}>
            <label
              onClick={() => onCardElementClick('cardHolder')}
              ref={cardHolderRef}
              style={{
                opacity: '0.7',
                color: '#fff',
                marginBottom: '6px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Source Code Pro', monospace",
                padding: '25px 15px',
                position: 'relative',
                height: '100%',
                textShadow: '7px 6px 10px rgba(14, 42, 90, 0.8)',
                userSelect: 'none',
              }}
            >
              Card Holder
            </label>
            <br />
            <label
              style={{
                color: '#fff',
                marginBottom: '6px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Source Code Pro', monospace",
                padding: '25px 15px',
                position: 'relative',
                height: '100%',
                textShadow: '7px 6px 10px rgba(14, 42, 90, 0.8)',
                userSelect: 'none',
              }}
            >
              {cardHolder}
            </label>
          </Grid>
          <Grid item xs={6}>
            <label
              onClick={() => onCardElementClick('cardDate')}
              ref={cardDateRef}
              style={{
                opacity: '0.7',
                color: '#fff',
                marginBottom: '6px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Source Code Pro', monospace",
                padding: '25px 15px',
                position: 'relative',
                height: '100%',
                textShadow: '7px 6px 10px rgba(14, 42, 90, 0.8)',
                userSelect: 'none',
              }}
            >
              Expires
            </label>
            <br />
            <label
              style={{
                color: '#fff',
                marginBottom: '6px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Source Code Pro', monospace",
                padding: '25px 15px',
                position: 'relative',
                height: '100%',
                textShadow: '7px 6px 10px rgba(14, 42, 90, 0.8)',
                userSelect: 'none',
              }}
            >
              {cardMonth}/{cardYear}
            </label>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Card;
