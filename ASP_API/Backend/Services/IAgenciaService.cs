using Backend.Models;

namespace Backend.Services;

/// <summary>
/// Interface para o serviço de gerenciamento de agências.
/// </summary>
public interface IAgenciaService
{
    /// <summary>
    /// Obtém todas as agências.
    /// </summary>
    IEnumerable<Agencia> GetAll();

    /// <summary>
    /// Obtém uma agência pelo código.
    /// </summary>
    Agencia? GetById(int codigo);

    /// <summary>
    /// Cria uma nova agência.
    /// </summary>
    Agencia Create(Agencia agencia);

    /// <summary>
    /// Atualiza uma agência existente.
    /// </summary>
    bool Update(int codigo, Agencia agencia);

    /// <summary>
    /// Remove uma agência pelo código.
    /// </summary>
    bool Delete(int codigo);
}