export const addUser = `
mutation addUser($email: String, $id: String = "", $name: String) {
  insert_users_one(object: {email: $email, id: $id, name: $name}, on_conflict: {constraint: users_pkey, update_columns: email}) {
    email
    id
    name
  }
}
`;
