using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DeviceManagementPro.Models
{
    public partial class efdbcontext : DbContext
    {
       
        
        public virtual DbSet<Notification> Notification { get; set; }
      
        public virtual DbSet<Role> Role { get; set; }
       
        public virtual DbSet<User> User { get; set; }
    
        public virtual DbSet<UserToRole> UserToRole { get; set; }

        public efdbcontext(DbContextOptions<efdbcontext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;database=sagardb;user=root;password=root;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
           
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("notification");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("employee_id_notification_idx");

                entity.Property(e => e.NotificationId).HasColumnName("notification_id");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.Isread)
                    .HasColumnName("isread")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasMaxLength(50);

                entity.Property(e => e.NotificationDate)
                    .HasColumnName("notification_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.NotificationType)
                    .IsRequired()
                    .HasColumnName("notification_type")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_id_notification");
            });

        
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.RoleName)
                    .HasName("role_name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasColumnName("role_name")
                    .HasMaxLength(20);
            });

          
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

               
                entity.HasIndex(e => e.Email)
                    .HasName("email_UNIQUE")
                    .IsUnique();

              
               

                entity.Property(e => e.UserId).HasColumnName("user_id");


                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(70);
                /*
                                entity.Property(e => e.FirstName)
                                    .HasColumnName("first_name")
                                    .HasMaxLength(45);


                                     entity.Property(e => e.LastName)
                                    .HasColumnName("last_name")
                                    .HasMaxLength(45);

                                entity.Property(e => e.MiddleName)
                                    .HasColumnName("middle_name")
                                    .HasMaxLength(45);


                  */
                entity.Property(e => e.Hashpassword).HasColumnName("hashpassword");

               
                entity.Property(e => e.Saltpassword).HasColumnName("saltpassword");



               
                

            });

          
            modelBuilder.Entity<UserToRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.ToTable("user_to_role");

                entity.HasIndex(e => e.RoleId)
                    .HasName("role_id_idx");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserToRole)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("role_id_to_role_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserToRole)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_to_user");
            });
        }
    }
}
