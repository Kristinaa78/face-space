using Microsoft.EntityFrameworkCore;

namespace face_space.Persistance.Model
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Connection> Connections { get; set; }
        public virtual DbSet<Recording> Recordings { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<Invite> Invites { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<User>()
                .HasMany(ur => ur.Recordings)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<User>()
                .HasMany(ur => ur.Rooms)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.AdminId)
                .IsRequired();

            builder.Entity<User>()
                .HasMany(ur => ur.Invites)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<Room>()
                .HasMany(s => s.Invites)
                .WithOne(c => c.Room)
                .HasForeignKey(s => s.RoomId);

            builder.Entity<Room>()
                .HasMany(s => s.Connections)
                .WithOne(c => c.Room)
                .HasForeignKey(s => s.RoomId);
        }
    }
}
