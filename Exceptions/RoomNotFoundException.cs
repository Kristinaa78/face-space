using System;

namespace face_space.Exceptions
{
    public class RoomNotFoundException : Exception
    {
        /// <summary>
        ///  Exception thrown when room with provided id was not found
        /// </summary>
        public RoomNotFoundException(int id) : base(GetMessage(id))
        {
        }

        private static string GetMessage(int id)
        {
            return "Room with id " + id + " could not be found.";
        }
    }
}
