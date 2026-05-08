using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

/// <summary>
/// Controlador para gerenciar agências.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AgenciaController : ControllerBase
{
    private readonly IAgenciaService _agenciaService;

    /// <summary>
    /// Inicializa uma nova instância do controlador.
    /// </summary>
    public AgenciaController(IAgenciaService agenciaService)
    {
        _agenciaService = agenciaService;
    }

    /// <summary>
    /// Retorna todas as agências cadastradas.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<Agencia>> GetAll()
    {
        var agencias = _agenciaService.GetAll();
        return Ok(agencias);
    }

    /// <summary>
    /// Retorna uma agência pelo código.
    /// </summary>
    [HttpGet("{codigo:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Agencia> GetById(int codigo)
    {
        var agencia = _agenciaService.GetById(codigo);
        if (agencia is null)
        {
            return NotFound();
        }

        return Ok(agencia);
    }

    /// <summary>
    /// Cria uma nova agência.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Agencia> Create([FromBody] Agencia agencia)
    {
        if (agencia is null)
        {
            return BadRequest("Dados da agência são obrigatórios.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var novaAgencia = _agenciaService.Create(agencia);
        return CreatedAtAction(nameof(GetById), new { codigo = novaAgencia.Codigo }, novaAgencia);
    }

    /// <summary>
    /// Atualiza uma agência existente.
    /// </summary>
    [HttpPut("{codigo:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Update(int codigo, [FromBody] Agencia agencia)
    {
        if (agencia is null)
        {
            return BadRequest("Dados da agência são obrigatórios.");
        }

        // Verifica se o código no corpo da requisição corresponde ao parâmetro da rota
        if (agencia.Codigo != 0 && agencia.Codigo != codigo)
        {
            return BadRequest("O código da agência deve corresponder ao parâmetro da rota.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var sucesso = _agenciaService.Update(codigo, agencia);
        if (!sucesso)
        {
            return NotFound();
        }

        return NoContent();
    }

    /// <summary>
    /// Remove uma agência pelo código.
    /// </summary>
    [HttpDelete("{codigo:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int codigo)
    {
        var sucesso = _agenciaService.Delete(codigo);
        if (!sucesso)
        {
            return NotFound();
        }

        return NoContent();
    }
}
