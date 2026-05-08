using Backend.Data;
using Backend.Models;

namespace Backend.Services;

/// <summary>
/// Implementação do serviço de gerenciamento de agências.
/// </summary>
public class AgenciaService : IAgenciaService
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Inicializa uma nova instância do serviço.
    /// </summary>
    public AgenciaService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public IEnumerable<Agencia> GetAll()
    {
        return _context.Agencias.ToList();
    }

    /// <inheritdoc />
    public Agencia? GetById(int codigo)
    {
        return _context.Agencias.FirstOrDefault(a => a.Codigo == codigo);
    }

    /// <inheritdoc />
    public Agencia Create(Agencia agencia)
    {
        _context.Agencias.Add(agencia);
        _context.SaveChanges();
        return agencia;
    }

    /// <inheritdoc />
    public bool Update(int codigo, Agencia agencia)
    {
        var existing = _context.Agencias.FirstOrDefault(a => a.Codigo == codigo);
        if (existing is null)
        {
            return false;
        }

        existing.Nome = agencia.Nome;
        existing.Cidade = agencia.Cidade;
        existing.EstadoUF = agencia.EstadoUF;
        _context.SaveChanges();
        return true;
    }

    /// <inheritdoc />
    public bool Delete(int codigo)
    {
        var agencia = _context.Agencias.FirstOrDefault(a => a.Codigo == codigo);
        if (agencia is null)
        {
            return false;
        }

        _context.Agencias.Remove(agencia);
        _context.SaveChanges();
        return true;
    }
}