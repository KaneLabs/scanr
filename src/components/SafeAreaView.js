import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const inset = { top: 'always', horizontal: 'never' };

export const arrayify = styles => (Array.isArray(styles) ? styles : [styles]);

export const SafeAreaContainer = ({ children, styles = {}, center }) => {
  const overrideableStyles = [
    styles.container,
    center && styles.centered,
    ...arrayify(styles),
  ];

  return (
    <SafeAreaView
      style={styles}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center' },
});
