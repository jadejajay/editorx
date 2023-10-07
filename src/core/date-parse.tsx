import { locale } from 'expo-localization';
import type { DateTimeFormatOptions } from 'intl';
export function parseDate(timestamp: number) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  const isSameYear = currentDate.getFullYear() === inputDate.getFullYear();
  const isSameMonth = currentDate.getMonth() === inputDate.getMonth();
  const isSameDay = currentDate.getDate() === inputDate.getDate();

  if (isSameYear && isSameMonth && isSameDay) {
    return 'Today';
  } else if (
    isSameYear &&
    isSameMonth &&
    currentDate.getDate() - inputDate.getDate() === 1
  ) {
    return 'Yesterday';
  } else if (isSameYear) {
    // Format as "18 January"
    const options: DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return inputDate.toLocaleDateString(locale, options);
  } else {
    // Format as "23 May 2020"
    const options: DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return inputDate.toLocaleDateString(locale, options);
  }
}

// export const groupPostsByDay = (postList: any) => {
//   const groupedPosts: any = [];

//   // Iterate over the list of posts
//   postList.forEach((post: any) => {
//     const uploadDate = new Date(post.uploadTime);

//     // Format the date as 'yyyy-MM-dd'
//     const formattedDate = `${uploadDate.getFullYear()}-${(
//       uploadDate.getMonth() + 1
//     )
//       .toString()
//       .padStart(2, '0')}-${uploadDate.getDate().toString().padStart(2, '0')}`;

//     // Check if there is already a group for the current date
//     const existingGroup = groupedPosts.find(
//       (group) => group[0] === formattedDate
//     );

//     if (existingGroup) {
//       // If a group exists for this date, add the post to that group
//       existingGroup[1].push(post);
//     } else {
//       // If no group exists, create a new group with the date as the heading
//       groupedPosts.push([formattedDate, [post]]);
//     }
//   });

//   return groupedPosts;
// };
// export const groupPostsByDay2 = (postList) => {
//   const groupedPosts = {};

//   // Iterate over the list of posts
//   postList.forEach((post) => {
//     const uploadDate = new Date(post.uploadTime * 1000); // Convert timestamp to Date

//     // Format the date as 'yyyy-MM-dd'
//     const formattedDate = `${uploadDate.getFullYear()}-${(
//       uploadDate.getMonth() + 1
//     )
//       .toString()
//       .padStart(2, '0')}-${uploadDate.getDate().toString().padStart(2, '0')}`;

//     // Check if there is already a group for the current date
//     if (groupedPosts[formattedDate]) {
//       // If a group exists for this date, add the post to that group
//       groupedPosts[formattedDate].posts.push(post);
//     } else {
//       // If no group exists, create a new group with the date as the key
//       groupedPosts[formattedDate] = {
//         date: formattedDate,
//         posts: [post],
//       };
//     }
//   });

//   // Convert the groupedPosts object into an array
//   const combinedPosts = Object.values(groupedPosts);

//   return combinedPosts;
// };
export const groupPostsByDay = (postList: any[]) => {
  const combinedPosts: any[] = [];

  let currentFormattedDate: any;

  // Iterate over the list of posts
  postList.forEach((post: { uploadTime: number }) => {
    const uploadDate = new Date(post.uploadTime).toLocaleDateString();
    // Format the date as 'yyyy-MM-dd'
    // const formattedDate = `${uploadDate.getFullYear()}-${(
    //   uploadDate.getMonth() + 1
    // )
    //   .toString()
    //   .padStart(2, '0')}-${uploadDate.getDate().toString().padStart(2, '0')}`;

    // Check if the formatted date has changed
    if (uploadDate !== currentFormattedDate) {
      // If the date has changed, add the date string to the combinedPosts array
      combinedPosts.push(post.uploadTime);
      currentFormattedDate = uploadDate;
    }

    // Add the post object to the combinedPosts array
    combinedPosts.push(post);
  });

  return combinedPosts;
};
