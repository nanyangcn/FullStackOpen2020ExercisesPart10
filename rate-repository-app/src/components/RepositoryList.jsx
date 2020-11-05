import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderMenu = ({ order, setOrder }) => {
  const styles = StyleSheet.create({
    container: {
      margin: 15,
      marginVertical: 5,
      marginRight: 25,
    },
    inputWeb: {
      borderWidth: 0,
      backgroundColor: theme.colors.main,
      fontSize: theme.fontSizes.body,
      paddingRight: 30,
    },
    inputAndroid: {
      borderWidth: 0,
      fontSize: theme.fontSizes.body,
      paddingRight: 30,
    },
    inputIOS: {
      borderWidth: 0,
      fontSize: theme.fontSizes.body,
      paddingRight: 30,
    },
  });

  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={styles}
        onValueChange={(value) => setOrder(value)}
        items={[
          { label: 'Latest repositories', value: 'latestRelated' },
          { label: 'Highest rated repositories', value: 'highestRated' },
          { label: 'Lowest rated repositories', value: 'lowestRated' },
        ]}
        placeholder={{}}
        value={order}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const order = this.props.order;
    const setOrder = this.props.setOrder;
    const searchKeyword = this.props.searchKeyword;
    const setSearchKeyword = this.props.setSearchKeyword;

    const styles = StyleSheet.create({
      searchContainer: {
        margin: 15,
        marginBottom: 0,
      },
    });

    return (
      <View>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder='Search'
            onChangeText={(query) => setSearchKeyword(query)}
            value={searchKeyword}
          />
        </View>
        <OrderMenu order={order} setOrder={setOrder} />
      </View>
    );
  };

  render() {
    const repositories = this.props.repositories;
    const history = this.props.history;
    const onEndReach = this.props.onEndReach;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latestRelated');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories, fetchMore } = useRepositories({
    order,
    searchKeyword,
    first: 4,
  });
  const history = useHistory();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 70,
    },
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View style={styles.container}>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
        order={order}
        setOrder={setOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        history={history}
      />
    </View>
  );
};

export default RepositoryList;
