import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
  event.locals.user = jwt ? JSON.parse(jwt)['user'] : null;
  return await resolve(event);
}

// export function getSession({ locals }) {
//   return {
//     user: locals.user && {
//       username: locals.user.username,
//       corporate_id: locals.user.corporate_id,
//       department: locals.user.department,
//       department_name: locals.user.department_name,
//       logged_in: locals.user.logged_in,
//       hospital_id: locals.user.hospital_id,
//       name: locals.user.name,
//       parent_corporation_id: locals.user.parent_corporation_id,
//       permission_administrator: locals.user.permission_administrator,
//       permission_parent_corporate: locals.user.permission_parent_corporate,
//       permission_quality: locals.user.permission_quality,
//       permission_trainer: locals.user.permission_trainer,
//       permission_viewer: locals.user.permission_viewer
//     }
//   };
// }
