import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { FormControl } from '@mui/material';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
  cardMonth,
  cardYear,
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  children,
}) {
  const [cardNumber, setCardNumber] = useState('');

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  // TODO: We can improve the regex check with a better approach like in the card component.
  const onCardNumberChange = (event) => {
    let { value, name } = event.target;
    let cardNumber = value;
    value = value.replace(/\D/g, '');
    if (/^3[47]\d{0,13}$/.test(value)) {
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
        .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
    }

    setCardNumber(cardNumber.trimRight());
    onUpdateState(name, cardNumber);
  };

  const onCvvFocus = (event) => {
    onUpdateState('isCardFlipped', true);
  };

  const onCvvBlur = (event) => {
    onUpdateState('isCardFlipped', false);
  };

  // NOTE: Currently the cursor on the card number field gets reset if we remove a number, the code bellow was used
  // in class components, need to transform this to work with functional components.
  // getSnapshotBeforeUpdate() {
  //     return this.props.cardNumberRef.current.selectionStart;
  // }

  // const componentDidUpdate = function (prevProps, prevState, cursorIdx) {
  //     const node = cardNumberRef.current;
  //     const { cardNumber: cardNum } = state;
  //     const { cardNumber: prevCardNum } = prevState;
  //     if (
  //         cardNum.length > prevCardNum.length &&
  //         cardNum[cursorIdx - 1] === ' '
  //     ) {
  //         cursorIdx += 1;
  //     } else if (prevCardNum[cursorIdx - 1] === ' ') {
  //         cursorIdx -= 1;
  //     }
  //     node.selectionStart = node.selectionEnd = cursorIdx;
  // };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ background: 'linear-gradient(#e66465, #9198e5)', marginTop: '50px', marginBottom: '0px', padding: '50px' }}
    >
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            minWidth: '500px',
            maxWidth: '800px',
            padding: '25px',
            mt: '-38%',
            pt: '220px',
            boxShadow: '0 20px 27px 0 rgba(0,0,0,0.05)',
            borderRadius: '15px',
          }}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              type="tel"
              name="cardNumber"
              autoComplete="off"
              onChange={onCardNumberChange}
              inputProps={{ maxLength: 19 }}
              ref={cardNumberRef}
              onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
              onBlur={onCardInputBlur}
              value={cardNumber}
              margin="normal"
            />
          </Grid>
          <div>
            <TextField
              fullWidth
              label="Card Holder"
              variant="outlined"
              type="text"
              autoComplete="off"
              name="cardHolder"
              onChange={handleFormChange}
              ref={cardHolderRef}
              onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
              onBlur={onCardInputBlur}
              margin="normal"
            />
          </div>

          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            type="tel"
            name="cardCvv"
            inputProps={{ maxLength: 4 }}
            autoComplete="off"
            onChange={handleFormChange}
            onFocus={onCvvFocus}
            onBlur={onCvvBlur}
            ref={cardCvv}
            margin="normal"
          />
          <Grid container>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                variant="outlined"
                select
                SelectProps={{
                  native: true,
                }}
                value={cardMonth}
                name="cardMonth"
                onChange={handleFormChange}
                ref={cardDateRef}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
                margin="normal"
              >
                {monthsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiration Year"
                variant="outlined"
                select
                SelectProps={{
                  native: true,
                }}
                value={cardYear}
                name="cardYear"
                onChange={handleFormChange}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
                margin="normal"
              >
                {yearsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
