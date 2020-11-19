class product:

    def __init__(self, codigo, nombre, descripcion):
        self.codigo = codigo
        self.nombre = nombre
        self.descripcion = descripcion

    def __repr__(self):
        return "product('{}', '{}', '{}')".format(self.codigo, self.nombre, self.descripcion)


# class mantenimiento:
