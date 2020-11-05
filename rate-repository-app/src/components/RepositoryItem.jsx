import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Text from './Text';
import theme from '../theme';

const FooterItem = ({ text, value }) => {
  const FooterStyles = StyleSheet.create({
    containerFooterItem: {
      flexGrow: 0,
    },
    containerNumber: {
      alignItems: 'center',
      paddingVertical: 2,
    },
    textNumber: {
      color: 'black',
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
  });

  const parseNumber = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value;
  };

  return (
    <View style={FooterStyles.containerFooterItem}>
      <View style={FooterStyles.containerNumber}>
        <Text style={FooterStyles.textNumber} testID={text}>
          {parseNumber(value)}
        </Text>
      </View>
      <View style={FooterStyles.containerNumber}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};
const RepositoryItem = ({ item, showButton }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingBottom: 10,
    },
    containerHead: {
      flexDirection: 'row',
    },
    containerLogo: {
      flexGrow: 0,
      margin: 15,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 5,
    },
    containerBody: {
      flexGrow: 0,
      marginVertical: 10,
      marginHorizontal: 5,
      width: '80%',
    },
    containerTitle: {
      paddingVertical: 3,
    },
    textTitle: {
      color: 'black',
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
    containerLanguage: {
      backgroundColor: theme.colors.secondary,
      paddingTop: 2,
      padding: 4,
      alignSelf: 'flex-start',
      borderRadius: 4,
      marginTop: 5,
    },
    containerFooter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
    },
    containerButton: {
      backgroundColor: theme.colors.secondary,
      alignItems: 'center',
      flexGrow: 1,
      padding: 15,
      margin: 15,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle} testID='fullName' fontWeight='bold'>
              {item.fullName}
            </Text>
          </View>
          <View style={styles.containerTitle}>
            <Text testID='description'>{item.description}</Text>
          </View>
          <View style={styles.containerLanguage}>
            <Text color='textSecondary' testID='language'>
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <FooterItem text='Stars' value={item.stargazersCount} />
        <FooterItem text='Forks' value={item.forksCount} />
        <FooterItem text='Reviews' value={item.reviewCount} />
        <FooterItem text='Rating' value={item.ratingAverage} />
      </View>
      {showButton && (
        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.url)}>
          <View style={styles.containerButton}>
            <Text color='textSecondary' fontWeight='bold'>
              Open in Github
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RepositoryItem;
