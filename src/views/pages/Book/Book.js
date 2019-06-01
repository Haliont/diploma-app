import React from 'react';
import PropTypes from 'prop-types';
import $propTypes from '@prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
// import * as appSelectors from '@ducks/app/appSelectors';
import * as appActions from '@ducks/app/appActions';

import MainLayout from '@layouts/MainLayout';
import Container from '@UI/Container';

import { Typography, Button, Chip } from '@material-ui/core';

import { getBook } from '@ducks/firestore/firestoreSelectors';
import { getIsSignedIn } from '@ducks/firebase/firebaseSelectors';
import Comments from './Comments';
import styles from './Book.module.scss';
import Description from './Description';
import AddCommentForm from './AddCommentForm';

function Book({ book, isSignedIn }) {
  const { cover, author, name, description, comments, genres } = book;
  const backgroundImage = `url(${cover})`;

  const renderLeft = (
    <div className={styles.left}>
      <div className={styles.image} style={{ backgroundImage }} />
      <div className={styles.buttons}>
        <Button className={styles.readBtn} size="large" color="primary" variant="contained">
          Читать
        </Button>
        <Button className={styles.addBtn} size="large" color="primary" variant="contained">
          На полку
          <div className={styles.addBtnPlus}>+</div>
        </Button>
      </div>
    </div>
  );

  const renderRight = (
    <div className={styles.right}>
      <div className={styles.header}>
        <Typography className={cn(styles.author, styles.headerText)} variant="subheading">
          {author}
        </Typography>
        <Typography className={cn(styles.name, styles.headerText)} variant="headline" paragraph>
          {name}
        </Typography>
        <div className={styles.genres}>
          {genres.map(({ id, name: genreName }) => (
            <Chip key={id} variant="default" label={genreName} />
          ))}
        </div>
      </div>
      <Description description={description} />
      <div style={{ marginTop: 24 }}>
        {isSignedIn && <AddCommentForm />}
        <Comments comments={comments} />
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className={styles.root}>
        <Container className={styles.inner}>
          {renderLeft}
          {renderRight}
        </Container>
      </div>
    </MainLayout>
  );
}

Book.propTypes = {
  book: PropTypes.shape($propTypes.book),
  isSignedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return {
    book: getBook(state, { id }),
    isSignedIn: getIsSignedIn(state),
  };
};

const mapDispatchToProps = { ...appActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
