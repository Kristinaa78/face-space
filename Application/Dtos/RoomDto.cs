﻿using System;

namespace face_space.Application.Dtos
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string RoomPassword { get; set; }
        public int Participants { get; set; }
        public bool EnableVideo { get; set; }
        public bool EnableChat { get; set; }
        public bool Invited { get; set; }
        public int Count { get; set; }
    }
}

