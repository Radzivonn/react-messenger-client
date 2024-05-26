import React, { useState } from 'react';
import './style.scss';
import { TextField } from '../../../components/UI/TextField/TextField';
import { useUsersSearch } from '../../../hooks/useUsersSearch/useUsersSearch';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { UserTab } from '../../../components/UI/Tabs/User-tab';
import { Navigate, useParams } from 'react-router-dom';
import { routes } from '../../../router/routes';

export const UserSearch = () => {
  const { id } = useParams() as { id: string };
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { isFetching: isFetchingSearchData, data: searchData } = useUsersSearch(
    id,
    debouncedSearch,
  );
  const { isFetching: isFetchingFriends, data: friends, isError } = useFriendList(id);

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
            userId={id}
            friendId={user.id}
            isFriend={Boolean(friends.find((friend) => friend.id === user.id))}
          />
        ))
      ) : debouncedSearch ? (
        <h2 className="m-auto text-xl italic">No such users were found</h2>
      ) : (
        <></>
      )}
    </>
  );
};
