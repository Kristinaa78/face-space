using System;

namespace face_space.Exceptions
{
    public class IncorrectRoomPasswordException : Exception
    {
        /// <summary>
        ///  Exception thrown when provided room password is incorrect
        /// </summary>
        public IncorrectRoomPasswordException() : base(GetMessage())
        {
        }

        private static string GetMessage()
        {
            return "Incorrect room password.";
        }
    }
}
