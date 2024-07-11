import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { TextField } from '../../../components/UI/TextField/TextField';
import { useUsersSearch } from '../../../hooks/useUsersSearch/useUsersSearch';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Loaders/TailSpinner';
import { UserTab } from '../../../components/UI/Tabs/User-tab';
import { MainPageComponentOutletContext } from '../../../types/types';

export const UserSearch = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { userId } = useOutletContext<MainPageComponentOutletContext>();
  const { isFetching: isFetchingSearchData, data: searchData } = useUsersSearch(
    userId,
    debouncedSearch,
  );
  const { isFetching: isFetchingFriends, data: friends } = useFriendList(userId);

  const isLoading = (isFetchingSearchData && !searchData) || (isFetchingFriends && !friends);
  const isNoSearchData = searchData && searchData.length === 0 && debouncedSearch.length > 0;
  const isAllDataLoaded = !!(searchData && friends);

  return (
    <>
      <TextField
        label="Search"
        name="search"
        type="search"
        className="m-auto mb-4 w-11/12"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
      {isLoading && <TailSpinner />}
      {isNoSearchData && <h2 className="text-hint">No such users were found</h2>}
      {isAllDataLoaded &&
        searchData.map((user) => (
          <UserTab
            key={user.id}
            name={user.name}
            userId={userId}
            friendId={user.id}
            isFriend={Boolean(friends.find((friend) => friend.id === user.id))}
            isOnline={user.online}
          />
        ))}
    </>
  );
};
