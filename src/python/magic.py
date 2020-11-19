import sqlite3
import sys
from classes import product

conn = sqlite3.connect('database\maintenance-database.db')

c = conn.cursor()


def creat_prod(codigo, nombre, descripcion):
    prod = product(codigo, nombre, descripcion)
    return prod


def insert(prod):
    with conn:
        c.execute("""INSERT INTO Equipo (codigo, nombre, descripcion) 
                    VALUES(:codigo, :nombre, :descripcion)""",
                  {'codigo': prod.codigo, 'nombre': prod.nombre, 'descripcion': prod.descripcion})


def getall():
    with conn:
        c.execute("SELECT * FROM Equipo")
        return print(c.fetchall())


def update_equipo(prod, descripcion):
    with conn:
        c.execute("""UPDATE Equipo SET descripcion = :descripcion,
                    WHERE codigo = :codigo AND nombre = :nombre""",
                  {'codigo': prod.codigo, 'nombre': prod.nombre, 'descripcion': descripcion})


def update(codigo, nombre, descripcion):
    with conn:
        c.execute("""UPDATE Equipo 
                    SET descripcion = :descripcion,
                    nombre = :nombre
                    WHERE  codigo = :codigo""",
                  {'codigo': codigo, 'nombre': nombre, 'descripcion': descripcion})


def remove_prd(prod):
    with conn:
        c.execute("DELETE from Equipo WHERE codigo = :codigo AND nombre = :nombre",
                  {'codigo': prod.codigo, 'nombre': prod.nombre})


getall()
sys.stdout.flush()
conn.commit()
conn.close()
