"reach 0.1";

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ready: Fun([], Null),
  });

  const User = API('User', {
    addUsers: Fun([], UInt ),
  });

  init();

 Alice.only(() => {
    interact.ready();
   
  });
  Alice.publish();
  const userArray = new Set();
    commit(); 
  Alice.publish();
  const [counter] =
    parallelReduce([0])
    .invariant(balance() == balance())
    .while( counter < 10 )
    .api_(User.addUsers, () => {
      check( this != Alice, "you are the user");
      return [ 0, (k) => {
        if(counter < 5){
          k(counter);
          userArray.insert(this);
        }
        else{
          k(counter);
        }
        return [ counter + 1];
      }];
    })
  transfer(balance()).to(Alice);
  commit();
  exit();
});