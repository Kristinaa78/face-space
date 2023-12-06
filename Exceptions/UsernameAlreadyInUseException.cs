using System;

namespace face_space.Exceptions
{
    public class UsernameAlreadyInUseException : Exception
    {
        /// <summary>
        ///  Exception thrown when user tries to register with a username already in use
        /// </summary>
        /// <param name="username"> Username </param>
        public UsernameAlreadyInUseException(string username) : base(GetMessage(username))
        {
        }

        private static string GetMessage(string username)
        {
            return "Username " + username + " is already in use.";
        }
    }
}
