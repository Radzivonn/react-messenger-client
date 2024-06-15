import React, { useState } from 'react';
import { TextField } from '../../../components/UI/TextField/TextField';
import { useUsersSearch } from '../../../hooks/useUsersSearch/useUsersSearch';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { UserTab } from '../../../components/UI/Tabs/User-tab';
import { Navigate, useOutletContext } from 'react-router-dom';
import { routes } from '../../../router/routes';
import { MainPageComponentOutletContextType } from '../../../types/types';

export const UserSearch = () => {
  const { userId } = useOutletContext<MainPageComponentOutletContextType>();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { isFetching: isFetchingSearchData, data: searchData } = useUsersSearch(
    userId,
    debouncedSearch,
  );
  const { isFetching: isFetchingFriends, data: friends, isError } = useFriendList(userId);

  if (isError) return <Navigate to={`/${routes.login}`} replace />;

  const isLoading = (isFetchingSearchData && !searchData) || (isFetchingFriends && !friends);
  const isAllDataLoaded = !!(searchData && searchData.length && friends); // !! - casting to boolean

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
      {isLoading ? (
        <TailSpinner />
      ) : isAllDataLoaded ? (
        searchData.map((user) => (
          <UserTab
            key={user.id}
            name={user.name}
            userId={userId}
            friendId={user.id}
            isFriend={Boolean(friends.find((friend) => friend.id === user.id))}
          />
        ))
      ) : (
        debouncedSearch && <h2 className="m-auto text-xl italic">No such users were found</h2>
      )}
    </>
  );
};
