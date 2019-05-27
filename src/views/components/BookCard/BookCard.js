import React from 'react';
// import PropTypes from 'prop-types';
import $propTypes from '@prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './BookCard.module.scss';
import { getBookAuthorNames } from '@utils/';

function BookCard({ cover, name, authors, onClick }) {
  return (
    <Card className={styles.root} onClick={onClick}>
      <CardActionArea className={styles.inner}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={styles.image}
          height="140"
          image={cover}
          title="Contemplative Reptile"
        />
        <div className={styles.info}>
          <Typography className={styles.name} component="span">
            {name}
          </Typography>
          <Typography className={styles.author} component="span">
            {getBookAuthorNames(authors)}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}

BookCard.propTypes = $propTypes.book;

export default BookCard;
