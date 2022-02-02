import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <div>{user}</div>
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps({ req, res, params }) {
  console.log(req, res, params);
  {
    return {
      props: { user: "max" },
    };
  }
}
