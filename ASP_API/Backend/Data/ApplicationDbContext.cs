using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

/// <summary>
/// Contexto de banco de dados para a aplicação.
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Conjunto de entidades de agências.
    /// </summary>
    public DbSet<Agencia> Agencias { get; set; }
}