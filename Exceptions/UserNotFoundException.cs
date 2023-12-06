using System;

namespace face_space.Exceptions
{
    public class UserNotFoundException : Exception
    {
        /// <summary>
        ///  Exception thrown when user's identity could not be determined
        /// </summary>
        /// <param name="username"> Username </param>
        public UserNotFoundException(string username) : base(GetMessage(username))
        {
        }

        private static string GetMessage(string username)
        {
            return "User " + username + " was not found.";
        }
    }
}
