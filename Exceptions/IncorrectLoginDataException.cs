using System;

namespace face_space.Exceptions
{
    public class IncorrectLoginDataException : Exception
    {
        /// <summary>
        ///  Exception thrown when login fails due to incorrect data provided
        /// </summary>
        public IncorrectLoginDataException() : base(GetMessage())
        {
        }

        private static string GetMessage()
        {
            return "Incorrect username or password.";
        }
    }
}
