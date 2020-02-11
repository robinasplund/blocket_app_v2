import React, { createContext, useState, useEffect } from 'react';
export const NewContext= createContext();

function NewContextProvider(props){

  const[ isLoggedIn, setIsLoggedIn ] = useState( false );
  const[ user, setUser ] = useState( '' );

  useEffect( () => {
    async function loadDataFromDb(){
      let result = await fetch( '/json/login/' );
      result = await result.json(); 
      if(result.error!=='Not logged in!'){
        setUser( result );
        setIsLoggedIn( true ); 
      }  
    }
    loadDataFromDb();
  },[]);

  return(
    <NewContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {props.children}
    </NewContext.Provider>
  );
}
export default NewContextProvider;